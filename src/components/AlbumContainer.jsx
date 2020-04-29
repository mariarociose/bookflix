import Album from "./Album";
import React from "react";
import ReactDOM from "react-dom";

class AlbumContainer extends React.Component{

    constructor(props){
        super(props);
    
        this.state = {
            books: []
        }
    
    }

    componentDidMount(){

        fetch("https://jsonplaceholder.typicode.com/users")
        .then(
          (response) => (response.json())
        )
        .then(

            (newBooks) => (
                this.setState({books: newBooks})
            )

        )
        .then(() => (console.log(this.state.books)))

    }
    

    render(){

        return(<Album books={this.state.books}></Album>)


    }

}

export default AlbumContainer;