import React from 'react'
import './DevItem.css'

export default class DevItem extends React.Component {
    constructor(props) {
        super(props)
        this.dev = this.props.dev
    }

    render() {
        return (
            <li className="dev-item">
                <header>
                    <img src={this.dev.avatar_url} alt={this.dev.name}/>
                    <div className="user-info">
                        <strong>{this.dev.name}</strong>
                        <span>{this.dev.techs.join(', ')}</span>
                    </div>
                </header>
                <p>{this.dev.bio}</p>
                <a href={`http://github.com/${this.dev.github_username}`}>Acessar perfil no Github</a>
            </li>
        )
    }
}
