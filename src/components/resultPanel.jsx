import React, {Component} from 'react'
import {config} from '../config.js'
import '../styles/style.css'
import SyllableContainer from './syllableContainer.jsx';

export default class ResultPanel extends Component{

    constructor(){
        super();
        this.state = {
            stateLoaded : 0,
            rhymeList : {
                oneSyllable:[], 
                twoSyllable:[],
                threeSyllable:[]
            },
            synonymList : [],
            resultPanel: "",
        }
        this.handleGetRhyme = this.handleGetRhyme.bind(this)
        this.handleGetSyn = this.handleGetSyn.bind(this)
    }


    handleGetSyn =()=> {

        const keyWord = this.props.selectedWord

        if (keyWord === ""){
            alert("Highlight a word to view synonyms.");
        }
        
        //Make call to MerriamWebster API (Note: Requires API Key)
        try{
            fetch("https://dictionaryapi.com/api/v3/references/thesaurus/json/" + keyWord + "?key=" + config.MERRIAM_WEBSTER_KEY)
                .then(res => res.json())
                .then(json => {
                    // TODO: Implement error handling for NULL / invalid words
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
        const keyWord = this.props.selectedWord
        if (keyWord === ""){
            alert("Highlight a word to view rhymes.");
        }
        try{
            fetch("https://api.datamuse.com/words?rel_rhy=" + keyWord)
            .then(res => res.json())
            .then(json=>{
                let cleanJson = this.formatRhymeData(json)
                this.setState({
                    stateLoaded: 2,
                    rhymeList:{
                        oneSyllable: cleanJson[0],
                        twoSyllable: cleanJson[1],
                        threeSyllable: cleanJson[2],
                    }
                })
            })
            // TODO: Make call for near / slant rhymes
        }catch(e){
            console.log("ERROR: " + e)
        }
    }

    // Used to clean data and organize into state, based on syllables
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

    // Determine which API to query when loading resultPanel
    componentDidUpdate(prevProps){
        if ((this.props.selectedWord !== prevProps.selectedWord) || (this.props.stateLoaded !== prevProps.stateLoaded)) {
            switch(this.props.stateLoaded){
                case 1:
                    // Synonyms panel
                    this.handleGetSyn();
                    break
                case 2:
                    // Rhyme panel
                    this.handleGetRhyme();
                    break    
                case 3:
                    // TODO: implement idea panel
                    break
                default:
                    break                    
            }
          }

    }

    render(){

        let resultPanel = '';

        switch(this.props.stateLoaded){
            case 1:
                // Synonyms panel
                resultPanel =   <div>
                                    <h3 style={{color:'black'}}>Synonyms</h3>
                                    {/* TODO: Make separate CSS file for container divs */}
                                    <div className="syn-container">
                                        <ul>
                                            {this.state.synonymList.map((listItem, index) => <li key={index}>{listItem}</li>)}
                                        </ul>
                                    </div>
                                </div>
                break
            case 2:
                // Rhyme panel
                const syllArr = Object.values(this.state.rhymeList)
                
                resultPanel =   syllArr.map((wordList, id) => <SyllableContainer key={id} syllNum={id} wordArr={wordList} />)
                break    
            case 3:
                // TODO: Section for idea
                break
            default:
                break                    
        }


        return(
            <div style={{width:'100%'
                }}>
                <ul>
                    {resultPanel}
                </ul>
            </div>
        );
    }
}