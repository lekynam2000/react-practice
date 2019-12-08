import React from "react"
import { render } from "react-dom"
import "./style.scss"

const likebtn = document.querySelector(".like");
function getData(city){
    var url = "http://api.openweathermap.org/data/2.5/weather?q=";
    var openweatherApiKey = '7b55b40b533897f929d79c9d5869e072';
    // var googleApiKey = "";
    // var ggurl = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input="+city+"&inputtype=textquery&fields=photos&key="+googleApiKey;
    fetch(url+city+"&appid="+openweatherApiKey)
    .then((response)=>{
        if(!response.ok){
            console.log("problem");
        }
        console.log(response.json())})
    .catch((e)=>console.log(e));
    // fetch(ggurl)
    // .then((response)=>{
    //     if(!response.ok){
    //         console.log("Error");
    //     }
    //     console.log(response.json());
    // })
};
class Status extends React.Component {
    constructor(props) {
        super(props),
            this.state = {
                likes: 0,
                comment: 0,
                commentList: [],
            }
        this.submit = this.submit.bind(this);
        this.upLike = this.upLike.bind(this);
        this.reset = this.reset.bind(this);
        this.input = React.createRef();
    }

    upLike() {
        getData("London");
        this.setState((state) => ({
            likes: state.likes + 1,
        }))
    }
    reset(event) {
        if (event.keyCode == 13) {
            this.input.current.value = "";
        }

    }

    submit(event) {
        if (event.keyCode == 13) {
            this.setState((state) => ({
                comment: state.comment + 1,
                commentList: [...state.commentList, this.input.current.value]
            }))
            console.log("sf" + this.state.comment);

        }
    }

    
    render() {
        return (
            <div>
                <section class="container">
                    <div class="info">
                        <div class="img"></div>
                        <div class="name">
                        <span>Nam Le</span><br/>
                        <span id="time">now</span>
                        </div>
                    </div>
                    <div class="content">
                        <div class="main"></div>
                        <div class="like" onClick={this.upLike}>
                        <span><i class="far fa-thumbs-up"></i>&nbsp; Like</span>
                        </div>
                        <div class="comment">
                        <span><i class="far fa-comment"></i>&nbsp; Comment</span>
                        </div>
                    </div>
                    <div class='status'>
                        <span>{this.state.likes} likes, {this.state.comment} comments</span>
                    </div>
                    <div class="comment">
                        {this.state.commentList.map(function (element) {

                            return <div class="text">{element}</div>;
                        })}
                        <input ref={this.input} type='text' class="comment"
                            onKeyDown={this.submit}
                            onKeyUp={this.reset}
                        ></input>
                    </div>
                </section>
                
            </div>


        )
    }
}
render(
    <Status ref={(component) => { window.component = component }} />,
    document.querySelector("#root")
);
