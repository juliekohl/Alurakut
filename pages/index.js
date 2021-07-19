import React from 'react';
import nookies from 'nookies';
import jwt from 'jsonwebtoken';
import MainGrid from '../src/components/MainGrid/MainGrid';
import Box from '../src/components/Box/Box';
import ProfileSidebar from '../src/components/ProfileSidebar/ProfileSidebar';
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelationsBoxWrapper/ProfileRelationsBoxWrapper';
import ProfileRelationsBox from '../src/components/ProfileRelationsBox/ProfileRelationsBox';

export default function Home(props) {
  const githubUser = props.githubUser;
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
  ];

  let pessoasFavoritasArray = [];
  pessoasFavoritas.map(favorita => {
    pessoasFavoritasArray.push({
      id: favorita,
      link: `https://github.com/${favorita}`,
      imageUrl: `https://github.com/${favorita}.png`,
      title: favorita
    });
  });

  const [followers, setFollowers] = React.useState([]);

  React.useEffect(function() {
    // GET
    fetch('https://api.github.com/users/juliekohl/followers')
    .then(function(response) {
      return response.json();
    })
    .then(function(followerGithub) {
      let followersArray = [];
      followerGithub.map(follower => {
        followersArray.push({
          id: follower.id,
          link: follower.html_url,
          imageUrl: follower.avatar_url,
          title: follower.login
        });
      })
      setFollowers(followersArray);
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
              Bem vindo(a), {githubUser}
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

          <ProfileRelationsBox
            title="Pessoas"
            items={pessoasFavoritasArray}
            more="Ver todos"
          />

          <ProfileRelationsBox
            title="Comunidades"
            items={communities}
            more="Ver todos"
          />
        </div>
      </MainGrid>
    </>
  )
}

export async function getServerSideProps(context) {
  const cookies = nookies.get(context);
  const token = cookies.USER_TOKEN;
  const { isAuthenticated } = await fetch('https://alurakut.vercel.app/api/auth', {
    headers: {
      Authorization: token
    }
  })
  .then((resposta) => resposta.json())

  if (!isAuthenticated) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }

  const { githubUser } = jwt.decode(token);

  return {
    props: {
      githubUser
    },
  }
}
