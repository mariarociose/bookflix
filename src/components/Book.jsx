import React from "react";
import ReactDom from "react-dom";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Link} from "react-router-dom";


class Book extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return (<Card className={this.props.clases.card}>
            <CardMedia
                className={this.props.clases.cardMedia}
                image="https://source.unsplash.com/random"
                title="Image title"
            />
            <CardContent className={this.props.clases.cardContent}>
            <Typography gutterBottom variant="h5" component="h2">
                {this.props.card.titulo}
            </Typography>
            <Typography>
                {this.props.card.descripcion}
            </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color="primary">
                    <Link to={`/detail/${this.props.clases.id}`}></Link>
                </Button>
                <Button size="small" color="primary">
                    Edit
                </Button>
            </CardActions>
        </Card>
        )
    }
}

export default Book;