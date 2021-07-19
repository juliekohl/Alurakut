import React from 'react';
import nookies from 'nookies';
import jwt from 'jsonwebtoken';
import MainGrid from '../src/components/MainGrid/MainGrid';
import Box from '../src/components/Box/Box';
import ProfileSidebar from '../src/components/ProfileSidebar/ProfileSidebar';
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import ProfileRelationsBox from '../src/components/ProfileRelationsBox/ProfileRelationsBox';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function Home(props) {
  const githubUser = props.githubUser;
  const [communities, setCommunities] = React.useState([]);
  const [followers, setFollowers] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

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
        });

        setFollowers(followersArray);
      });

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
      });
  }, []);

  const formik = useFormik({ 
    initialValues: { 
      title: '',
      image: '',
      creator: ''
    }, 
    validationSchema: Yup.object({  
      title: Yup.string().required('Obrigatório'), 
      image: Yup.string().url('URL inválida').required('Obrigatório'), 
      creator: Yup.string().required('Obrigatório'), 
    }), 
    onSubmit: values => {
      setLoading(true);

      const community = {
        title: values.title,
        imageUrl: values.image,
        creatorSlug: values.creator,
      };

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
        setCommunities(communitiesUpdated);

        alert('Comunidade criada como sucesso!');

        setLoading(false);
      });
    }, 
  });

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
            <form onSubmit={formik.handleSubmit}>
              <input 
                placeholder="Qual vai ser o nome da sua comunidade?" 
                name="title" 
                aria-label="Qual vai ser o nome da sua comunidade?" 
                type="text"
                onChange={formik.handleChange} 
                onBlur={formik.handleBlur} 
                value={formik.values.title} 
              />
              {formik.touched.title && formik.errors.title ? ( 
                <div className="formError">{formik.errors.title}</div> 
              ) : null} 

              <input 
                placeholder="Coloque uma URL para usarmos de capa" 
                name="image" 
                aria-label="Coloque uma URL para usarmos de capa" 
                onChange={formik.handleChange} 
                onBlur={formik.handleBlur} 
                value={formik.values.image} 
              />
              {formik.touched.image && formik.errors.image ? ( 
                <div className="formError">{formik.errors.image}</div> 
              ) : null}

              <input 
                placeholder="Autor da comunidade" 
                name="creator" 
                aria-label="Autor da comunidade" 
                type="text"
                onChange={formik.handleChange} 
                onBlur={formik.handleBlur} 
                value={formik.values.creator} 
              />
              {formik.touched.creator && formik.errors.creator ? ( 
                <div className="formError">{formik.errors.creator}</div> 
              ) : null}

              {!loading ? (
                <button type="submit">
                  Criar comunidade
                </button>
              ) : (
                <button type="submit" disabled>
                  Aguarde um momento
                </button>
              )}
            </form>
          </Box>
        </div>

        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBox
            title="Seguidores"
            items={followers}
          />

          <ProfileRelationsBox
            title="Pessoas"
            items={peopleFavoriteArray}
          />

          <ProfileRelationsBox
            title="Comunidades"
            items={communities}
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
  .then((response) => response.json());

  if (!isAuthenticated) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    };
  }

  const { githubUser } = jwt.decode(token);

  return {
    props: {
      githubUser
    }
  };
}
