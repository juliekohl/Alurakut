import Box from '../Box/Box';
import { AlurakutProfileSidebarMenuDefault } from '../../lib/AlurakutCommons';
import styled from 'styled-components';

export default function ProfileSidebar(props) {
  return (
    <Box as="aside">
      <Wrapper className="alurakutMenuProfileSidebar">
        <img className="alurakutMenuProfileSidebar__profile" src={`https://github.com/${props.githubUser}.png`} />

        <a className="boxLink" href={`https://github.com/${props.githubUser}`}>
          @{props.githubUser}
        </a>

        <AlurakutProfileSidebarMenuDefault />
      </Wrapper>
    </Box>
  )
}

const Wrapper = styled.div`
  .alurakutMenuProfileSidebar__profile {
    border-radius: 8px;
  }

  .boxLink {
    display: block;
    margin-top: 15px;
    margin-bottom: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
    border-top: 1px solid #ecf2fa;
    border-bottom: 1px solid #ecf2fa;
  }
`;