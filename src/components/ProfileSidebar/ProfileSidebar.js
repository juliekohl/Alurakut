import Box from '../Box/Box';
import { AlurakutProfileSidebarMenuDefault } from '../../lib/AlurakutCommons';

export default function ProfileSidebar(props) {
  return (
    <Box as="aside">
      <div className="alurakutMenuProfileSidebar">
        <img src={`https://github.com/${props.githubUser}.png`} style={{ borderRadius: '8px' }} />
        <hr />

        <p>
          <a className="boxLink" href={`https://github.com/${props.githubUser}`}>
            @{props.githubUser}
          </a>
        </p>
        <hr />

        <AlurakutProfileSidebarMenuDefault />
      </div>
    </Box>
  )
}