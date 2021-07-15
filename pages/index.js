import React from 'react';
import MainGrid from '../src/components/MainGrid/MainGrid';
import Box from '../src/components/Box/Box';
import ProfileSidebar from '../src/components/ProfileSidebar/ProfileSidebar';
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations/ProfileRelations';

function ProfileRelationsBox(props) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="subTitle">
        {props.title} ({props.items.length})
      </h2>

      {/* <ul>
        {followers.map((follower) => {
          return (
            <li key={follower.id}> 
              <a href={follower.image}>
                <img src={`https://github.com/${follower.login}.png`} />
                <span>github.com/<strong>{follower.login}</strong></span>
              </a>
            </li>
          )
        })}
      </ul> */}

      <h3 className="smallTitle">{props.more}</h3>
    </ProfileRelationsBoxWrapper>
  )
}

export default function Home() {
  const githubUser = 'juliekohl';
  const [communities, setCommunities] = React.useState([]);

  const pessoasFavoritas = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini',
    'marcobrunodev',
    'cesarkohl',
    'felipefialho',
    'juliolmuller',
    'williammago'
  ]

  const [followers, setFollowers] = React.useState([]);

  React.useEffect(function() {
    // GET
    fetch('https://api.github.com/users/juliekohl/followers')
    .then(function(response) {
      return response.json();
    })
    .then(function(followerGithub) {
      setFollowers(followerGithub);
    })

    // API GraphQL
    fetch('https://graphql.datocms.com', {
      method: 'POST',
      headers: {
        'Authorization': 'fbeeee0417370c1a491fe75bb8fee2',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ "query": `query {
        allCommunities {
          id
          title
          imageUrl
          creatorSlug
        }
      }` })
    })
    .then((response) => response.json())
    .then((respostaCompleta) => {
      const communitiesVindasDoDato = respostaCompleta.data.allCommunities;
      setCommunities(communitiesVindasDoDato)
    })
  }, [])

  // criar um box que vai ter um map, baseado nos itens do array que pegamos do Github

  return (
    <>
      <AlurakutMenu githubUser={githubUser} />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <Box>
            <ProfileSidebar githubUser={githubUser} />
          </Box>
        </div>
        
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">
              Bem vindo(a), Julie
            </h1>

            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={function handleCreateCommunity(e) {
              e.preventDefault();
              const dadosDoForm = new FormData(e.target);

              console.log('Campo:', dadosDoForm.get('title'));
              console.log('Campo:', dadosDoForm.get('image'));

              const community = {
                title: dadosDoForm.get('title'),
                imageUrl: dadosDoForm.get('image'),
                creatorSlug: githubUser,
              }

              fetch('/api/communities', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(community)
              })
              .then(async (response) => {
                const dados = await response.json();
                console.log(dados.registroCriado);
                const community = dados.registroCriado;
                const communitiesUpdated = [...communities, community];
                setCommunities(communitiesUpdated)
              })
            }}>
              <div>
                <input 
                  placeholder="Qual vai ser o nome da sua comunidade?" 
                  name="title" 
                  aria-label="Qual vai ser o nome da sua comunidade?" 
                  type="text"
                />
              </div>

              <div>
                <input 
                  placeholder="Coloque uma URL para usarmos de capa" 
                  name="image" 
                  aria-label="Coloque uma URL para usarmos de capa" 
                />
              </div>

              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
        </div>

        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBox
            title="Seguidores"
            items={followers} 
            more="Ver todos"
          />

          <ProfileRelationsBoxWrapper>
            <h2 className="subTitle">
              Pessoas da comunidade dev ({pessoasFavoritas.length})
            </h2>

            <ul>
              {pessoasFavoritas.map((itemAtual) => {
                return (
                  <li key={itemAtual}>
                    <a href={`/users/${itemAtual}`}>
                      <img src={`https://github.com/${itemAtual}.png`} />
                      <span>{itemAtual}</span>
                    </a>
                  </li>
                )
              })}
            </ul>

            <h3 className="smallTitle">Ver todos</h3>
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBoxWrapper>
            <h2 className="subTitle">
              Comunidades ({communities.length})
            </h2>

            <ul>
              {communities.map((itemAtual) => {
                return (
                  <li key={itemAtual.id}>
                    <a href={`/communities/${itemAtual.id}`}>
                      <img src={itemAtual.imageUrl} />
                      <span>{itemAtual.title}</span>
                    </a>
                  </li>
                )
              })}
            </ul>

            <h3 className="smallTitle">Ver todos</h3>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  )
}
