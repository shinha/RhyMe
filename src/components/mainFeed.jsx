import React, {Component} from 'react'
import 'bootstrap/dist/css/bootstrap.css'

export default class MainFeed extends Component{
    render(){
        const notepad = {
            padding: '8px',
            margin: '8px'
        }


        return(
        <div >
            <h1>Yuh</h1>
            <h2>Welcome to traphouse v1.0.</h2>
            <div className="Step-1 row">
                <div style={{background:'#ff9c9c'} } className="col-8">
                    This is the left side
                </div>
                <div style={{background:'#dd9c9c'}} className="col-4 row">
                    <div className="btn1 col-sm">
                        <button type="button" className="btn btn-synonym btn-primary">Synonym</button>
                    </div>
                    <div className="btn1 col-sm">
                        <button type="button" className="btn btn-rhyme btn-primary">Rhyme</button>
                    </div>
                    <div className="btn1 col-sm">
                        <button type="button" className="btn btn-idea btn-primary">Idea</button>
                    </div>
                </div>
            </div>
            <div className="Step-1 row">
                <div style={{background:'#ff9c9c'} } className="col-8">
                    <textarea style={notepad} defaultValue="ok"></textarea>
                </div>
                <div style={{background:'#dd9c9c'}} className="col-4 row ">
                </div>
            </div>
        </div>
        )
    }
}
