import MainGrid from '../src/components/MainGrid/MainGrid';
import Box from '../src/components/Box/Box';
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations/ProfileRelations';

function ProfileSidebar(props) {
  return (
    <Box>
      <img src={`https://github.com/${props.githubUser}.png`} style={{ borderRadius: '8px' }} />
    </Box>
  )
}

export default function Home() {
  const githubUser = 'juliekohl';
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

  return (
    <>
      <AlurakutMenu />
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
        </div>

        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBoxWrapper>
            <h2 className="subTitle">
              Pessoas da comunidade dev ({pessoasFavoritas.length})
            </h2>

            <ul>
            {pessoasFavoritas.map((itemAtual) => {
              return (
                <li>
                  <a href={`/users/${itemAtual}`} key={itemAtual} >
                    <img src={`https://github.com/${itemAtual}.png`} />
                    <span>{itemAtual}</span>
                  </a>
                </li>
              )
            })}
            </ul>

            <h3 className="smallTitle">
              Ver todos
            </h3>
          </ProfileRelationsBoxWrapper>

          <Box className="profileComunidadesArea" style={{ gridArea: 'profileComunidadesArea' }}> 
            <h2 className="subTitle">
              Comunidade
            </h2>
          </Box>
        </div>
      </MainGrid>
    </>
  )
}
