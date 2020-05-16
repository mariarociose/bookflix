import Album from "./Album";
import React from "react";
import ReactDOM from "react-dom";
import CommonDisplay from "./CommonDisplay";
class AlbumContainer extends CommonDisplay{

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
    
    renderContent = () =>(
        <h1>SOY La sublclase</h1>
         
    )
    

}

export default AlbumContainer;