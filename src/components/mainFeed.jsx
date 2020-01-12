import React, {Component} from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import {config} from '../config.js'

export default class MainFeed extends Component{

    constructor(props){
        super(props);
        this.state = {
            synonymList: [],
            rhymeList1:[],
            rhymeList2:[],
            rhymeList3:[],
            slantRhymeList:[],
            ideaList:[],
            stateLoaded: 0 // 1 = Synonym, 2 = Rhyme, 3 = Idea
        }
    }

    handleGetSyn =()=> {

        let keyWord = window.getSelection().toString()
        
        try{
            fetch("https://dictionaryapi.com/api/v3/references/thesaurus/json/" + keyWord + "?key=" + config.MERRIAM_WEBSTER_KEY)
                .then(res => res.json())
                .then(json => {
                    this.setState({
                        stateLoaded: 1,
                        synonymList: json[0].meta.syns.flat()
                    })
                })
        }catch(e){
            console.log("ERROR: " + e)
        }
    }

    
    handleGetRhyme = () =>{
        let keyword = window.getSelection().toString();
        try{
            // TODO: Make call for actual rhynmes
            fetch("https://api.datamuse.com/words?rel_rhy=" + keyword)
            .then(res => res.json())
            .then(json=>{
                let cleanJson = this.formatRhymeData(json)
                this.setState({
                    stateLoaded: 2,
                    rhymeList1: cleanJson[0],
                    rhymeList2: cleanJson[1],
                    rhymeList3: cleanJson[2],
                })
            })
            // TODO: Make call for near rhymes
        }catch(e){
            console.log("ERROR: " + e)
        }
    }
    formatRhymeData(jsonObj){
        // Note: each item in the json object is a separate word
        let rhyme1 = []
        let rhyme2 = []
        let rhyme3 = []

        for (let ele in jsonObj){
            let numSyllables = jsonObj[ele].numSyllables
            // Add word to respective list based on the # of syllables
            switch(numSyllables){
                case 1:
                    rhyme1.push(jsonObj[ele].word)
                    break
                case 2:
                    rhyme2.push(jsonObj[ele].word)
                    break
                case 3:
                    rhyme3.push(jsonObj[ele].word)
                    break
                default:
                    // Disregard any words above 4-syllables
                    break
            }
        } 
        
        return [rhyme1, rhyme2, rhyme3]
    }

    render(){
        const notepad = {
            padding: '8px',
            margin: '8px',
            backgroundImage: 'url("https://image.freepik.com/free-photo/design-space-paper-textured-background_53876-42312.jpg")',
            backgroundSize: 'cover',
            fontSize: '16px',
            width:'80%',
            height:'800px',
        }

        var {stateLoaded, synonymList, rhymeList1, rhymeList2, rhymeList3} = this.state

        let resultPanel = <p></p>

        let lyrics = "Yeah, I'm gonna take my horse to the old town road\nI'm gonna ride 'til I can't no more\nI'm gonna take my horse to the old town road\nI'm gonna ride 'til I can't no more (Kio, Kio)\nI got the horses in the back\nHorse tack is attached\nHat is matte black\nGot the boots that's black to match\nRidin' on a horse, ha\nYou can whip your Porsche\nI been in the valley\nYou ain't been up off that porch, now"
        console.log(rhymeList2)

        switch(stateLoaded){
            case 1:
                // Synonyms panel
                resultPanel = synonymList.map(listItem => <li>{listItem}</li>)
                break
            case 2:
                // Rhyme panel
                resultPanel = rhymeList2.map(listItem => <li>{listItem}</li>)
                break    
            case 3:
                // TODO: implement this 
                break
            default:
                break                    
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
                        <button type="button" onClick={this.handleGetSyn} className="btn btn-synonym btn-primary">Synonym</button>
                    </div>
                    <div className="btn1 col-sm">
                        <button type="button" onClick={this.handleGetRhyme} className="btn btn-rhyme btn-primary">Rhyme</button>
                    </div>
                    <div className="btn1 col-sm">
                        <button type="button" className="btn btn-idea btn-primary">Idea</button>
                    </div>
                </div>
            </div>
            <div className="Step-1 row">
                <div style={{background:'#ff9c9c'} } className="col-8">
                    <textarea style={notepad} defaultValue={lyrics}></textarea>
                </div>
                <div style={{background:'#dd9c9c'}} className="col-4 row ">
                    <ul>
                        {resultPanel}
                    </ul>
                </div>
            </div>
        </div>
        )
    }
}
