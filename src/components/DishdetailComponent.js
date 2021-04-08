import React,{Component} from 'react';
import { Card, Media, CardImg, Breadcrumb, CardText, CardBody, CardTitle, 
     BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Row, Label, Col} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, Errors, LocalForm } from 'react-redux-form';



class CommentForm extends Component{
    constructor(props){
        super(props);
        this.state={
            isModalOpen:false
        }
        this.toggleModal=this.toggleModal.bind(this);
    }
    toggleModal(){
        this.setState({
            isModalOpen:!this.state.isModalOpen
            
        });
      console.log("Modal toggled")
    }
    render(){
        return(
            <div>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal} >
                <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                   
                    </ModalBody>
                </Modal>
                <Button outline onClick={this.toggleModal}>
                        <span class="fa fa-pencil"></span>
                         Submit Comment</Button>
            </div>
            
        );
    }
}



    function RenderDish(dish)
    {
        console.log(dish);
        if(dish!=null){
            return(
                <div>
                 <Card >
                    <CardImg width="100%" src={dish.image} alt={dish.name}/>
                    <CardBody>
                        <CardTitle >{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
                </div>
            );
        }
        else{
            return(
                <div></div>
            )
        }
    }
    function RenderComments({comments})
    {
        // let {c,comment}={...dish};
        // console.log(comment);
        if(comments!=null){
            const comment=comments.map((c)=>{
                let date= new Date(c.date).toDateString();
                return(  
                    <div>
                    <div key={c.id}>
                        <ul className="list-unstyled">
                            <li >{c.comment}</li>
                            <br/>
                            <li>-- {c.author}, {date.substring(3,10)},{date.substring(10) }</li>
                        </ul>
                    </div>
                    </div>
                )
            })
            return (
                <div>
                    <h4>Comments</h4>
                    {comment}
                    <CommentForm/>
                </div>
            )
        }
        else{
            return(
                <div></div>
            )
        }
}
const Dishdetail=(props)=>{
    console.log(props.comments)
    const dish= props.dish;

    return(
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr/>
                    </div>
                </Breadcrumb>
            </div>
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <RenderDish dish={props.dish} />
                </div>
                <div className="col-12 col-md-5 m-1">
                    <RenderComments comments={props.comments} />
                </div>
            </div>
        </div>
    )
}
export default Dishdetail;
 // if(comments!=null){
        //     this.state.heading=<h4>Comments</h4>
        //     this.state.comments=comments.map((c)=>{
        //         return (
        //             <div key={c.id}>
        //                 <ListGroup >
        //                     <ListGroupItem className="border-0">{c.comment}</ListGroupItem>
        //                     <ListGroupItem className="border-0">-- {c.author}, {new Date(c.date).toDateString().slice(3) }</ListGroupItem>
        //                 </ListGroup>
        //              </div>
        //         )})
        //         }
        // {this.state.heading}
        // {this.state.comments}