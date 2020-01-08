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
            isLoaded: false
        }
    }

    handleGetSyn =()=> {

        let keyWord = window.getSelection().toString()
        
        try{
            let result = fetch("https://dictionaryapi.com/api/v3/references/thesaurus/json/" + keyWord + "?key=" + config.MERRIAM_WEBSTER_KEY)
                .then(res => res.json())
                .then(json => {
                    console.log(JSON.stringify(json))
                    this.setState({
                        isLoaded: true,
                        synonymList: json[0].meta.syns.flat()
                    })
                })
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
                    rhyme1.append(jsonObj[ele].word)
                    break
                case 2:
                    rhyme2.append(jsonObj[ele].word)
                    break
                case 3:
                    rhyme3.append(jsonObj[ele].word)
                    break
                default:
                    // Disregard any words above 4-syllables
                    break
            }
        } 
        return [rhyme1, rhyme2, rhyme3]
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
                    isLoaded:true,
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

    render(){
        const notepad = {
            padding: '8px',
            margin: '8px'
        }

        var {isLoaded, synonymList} = this.state

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
                    <textarea style={notepad} defaultValue="ok"></textarea>
                </div>
                <div style={{background:'#dd9c9c'}} className="col-4 row ">
                    <ul>
                        {synonymList.map(listItem => <li>{listItem}</li>)}
                    </ul>
                </div>
            </div>
        </div>
        )
    }
}
