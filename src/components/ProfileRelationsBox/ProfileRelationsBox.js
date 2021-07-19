import { ProfileRelationsBoxWrapper } from '../ProfileRelationsBoxWrapper/ProfileRelationsBoxWrapper';

export default function ProfileRelationsBox(props) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="subTitle">
        {props.title} ({props.items.length})
      </h2>

      <ul>
        {props.items.map((itemAtual) => {
          return (
            <li key={itemAtual.id}>
              <a href={itemAtual.link}>
                <img src={itemAtual.imageUrl} />
                <span>{itemAtual.title}</span>
              </a>
            </li>
          )
        })}
      </ul>

      <h3 className="smallTitle">{props.more}</h3>
    </ProfileRelationsBoxWrapper>
  )
}