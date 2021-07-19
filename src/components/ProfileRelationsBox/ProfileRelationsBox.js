import { ProfileRelationsBoxWrapper } from '../ProfileRelationsBoxWrapper/ProfileRelationsBoxWrapper';

export default function ProfileRelationsBox(props) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="subTitle">
        {props.title} ({props.items.length})
      </h2>

      <ul>
        {props.items.map((item) => {
          return (
            <li key={item.id}>
              <a href={item.link}>
                <img src={item.imageUrl} />
                <span>{item.title}</span>
              </a>
            </li>
          )
        })}
      </ul>

      <h3 className="smallTitle">{props.more}</h3>
    </ProfileRelationsBoxWrapper>
  )
}