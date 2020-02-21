import React, {Component} from 'react'
import ResultPanel from '../components/resultPanel'
import 'bootstrap/dist/css/bootstrap.css'

export default class MainFeed extends Component{

    constructor(props){
        super(props);
        this.state = {
            selectedWord: "",
            stateLoaded: 0 // 1 = Synonym, 2 = Rhyme, 3 = Idea
        }
        this.handleActionClick = this.handleActionClick.bind(this);
    }
    
    //Sets the stateLoaded, which determines the type of button action was selected
    handleActionClick = (actionIndex) =>{
        this.setState({
            stateLoaded: actionIndex,
            selectedWord: window.getSelection().toString()
        });
    }


    render(){
        const {selectedWord, stateLoaded} = this.state


        const lyrics = "Yeah, I'm gonna take my horse to the old town road\nI'm gonna ride 'til I can't no more\nI'm gonna take my horse to the old town road\nI'm gonna ride 'til I can't no more (Kio, Kio)\nI got the horses in the back\nHorse tack is attached\nHat is matte black\nGot the boots that's black to match\nRidin' on a horse, ha\nYou can whip your Porsche\nI been in the valley\nYou ain't been up off that porch, now"
        

        return(
            <div >
                <h2 style={{padding:'8px'}}>RhyMe Lyric Editor v1.0.</h2>
                <div className="Step-1 row">
                    <div style={{background:'#ff9c9c',color:'black'} } className="p-3 col-8">
                        {this.state.selectedWord === "" ? "Select a word to highlight to use synonym / rhyme query." : "You selected:" + this.state.selectedWord}
                    
                    </div>
                    <div style={{background:'#dd9c9c'}} className="p-3 col-4 row">
                        <div className="btn1 col-sm">
                            <button type="button" onClick={() => this.handleActionClick(1)} className="p-2 btn btn-synonym btn-dark">Synonym</button>
                        </div>
                        <div className="btn1 col-sm">
                            <button type="button" onClick={() => this.handleActionClick(2)} className="p-2 btn btn-rhyme btn-dark">Rhyme</button>
                        </div>
                    </div>
                </div>
                <div className="Step-1 row">
                    <div style={{background:'#ff9c9c'} } className="col-8">
                        <textarea defaultValue={lyrics}></textarea>
                    </div>
                    <div style={{background:'#dd9c9c'}} className="col-4 row ">
                        <ResultPanel selectedWord = {selectedWord} stateLoaded={stateLoaded}/>
                    </div>
                </div>
            </div>
        )
    }
}
