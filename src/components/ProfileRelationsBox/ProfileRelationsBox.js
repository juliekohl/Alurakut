import { ProfileRelationsBoxWrapper } from '../ProfileRelationsBoxWrapper/ProfileRelationsBoxWrapper';

export default function ProfileRelationsBox(props) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="subTitle">
        {props.title} ({props.items.length})
      </h2>

      {/* <ul>
        {followers.map((itemAtual) => {
          return (
            <li key={itemAtual.id}>
              <a href={`https://github.com/${itemAtual}.png`}>
                <img src={itemAtual.image} />
                <span>{itemAtual.title}</span>
              </a>
            </li>
          )
        })}
      </ul> */}

      <h3 className="smallTitle">{props.more}</h3>
    </ProfileRelationsBoxWrapper>
  )
}