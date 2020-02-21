import React, {Component}  from 'react'

export default class SyllableContainer extends Component{
    render(){
        return(
            <div>
                <h3 style={{color:'black'}}>{this.props.syllNum + 1}-Syllable(s)</h3>
                <div className="container">
                    <ul>
                        {this.props.wordArr.map((listItem, id) => <li key={id}>{listItem}</li>)}
                    </ul>
                </div>
            </div>
        )
    }
}