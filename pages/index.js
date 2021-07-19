import React from 'react';
import nookies from 'nookies';
import jwt from 'jsonwebtoken';
import MainGrid from '../src/components/MainGrid/MainGrid';
import Box from '../src/components/Box/Box';
import ProfileSidebar from '../src/components/ProfileSidebar/ProfileSidebar';
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import ProfileRelationsBox from '../src/components/ProfileRelationsBox/ProfileRelationsBox';

export default function Home(props) {
  const githubUser = props.githubUser;
  const [communities, setCommunities] = React.useState([]);
  const [followers, setFollowers] = React.useState([]);

  function setStateFollowers() {
    const peopleFavorite = [
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
  
    let peopleFavoriteArray = [];
    peopleFavorite.map(favorite => {
      peopleFavoriteArray.push({
        id: favorite,
        link: `https://github.com/${favorite}`,
        imageUrl: `https://github.com/${favorite}.png`,
        title: favorite
      });
    });

    return peopleFavoriteArray;
  }
  let peopleFavoriteArray = setStateFollowers();

  React.useEffect(function() {
    // Set Followers
    fetch('https://api.github.com/users/juliekohl/followers')
      .then(response => response.json())
      .then(function(followers) {
        let followersArray = [];
        
        followers.map(follower => {
          followersArray.push({
            id: follower.id,
            link: follower.html_url,
            imageUrl: follower.avatar_url,
            title: follower.login
          });
        })

        setFollowers(followersArray);
      })

    // Set communities
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
      .then((response) => {
        setCommunities(response.data.allCommunities)
      })
  }, [])

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

              const data = new FormData(e.target);

              const community = {
                title: data.get('title'),
                imageUrl: data.get('image'),
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
                const data = await response.json();
                const community = data.register;
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

              <div>
                <input 
                  placeholder="Autor da comunidade" 
                  name="creator" 
                  aria-label="Autor da comunidade" 
                  type="text"
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
            items={peopleFavoriteArray}
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
  .then((response) => response.json())

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
    }
  }
}
