import React from "react"
import {render} from "react-dom"
import "./style.scss"
const likebtn = document.querySelector(".like");
class Status extends React.Component{
    constructor(props){
        super(props),
        this.state={
            likes: 0,
            comment: 0,
            commentList:["ok"],
        }
        
        this.upLike = this.upLike.bind(this);
        this.input= React.createRef();
    }
    
    upLike(){
        this.setState((state)=>{
            likes: state.likes+1;
        })
    }
    
    
    submit(event){
        if(event.keyCode==13){
            this.setState((state)=>({
                commentList: [...state.commentList,this.input.current.value]
            }))
        }
    }
    
    render(){
        return(
            <div>
                <div class='status'>
                    <span>{this.state.likes} likes, {this.state.comment} comments</span>
                </div>
                <div class="comment">
                    {this.state.commentList.map(function(element){
                        console.log("do");
                        return <div class="text">{element}</div>;
                    })}    
                    <input ref={this.input} type='text' class="comment" 
                    onKeyDown = {this.submit}
                    ></input>
                </div>
            </div>
            

        )
    }
}
render(
    <Status ref = {(status)=>{window.status = status}}/>,
    document.querySelector("#root")
);
document.querySelector(".like").addEventListener("click",status.upLike);