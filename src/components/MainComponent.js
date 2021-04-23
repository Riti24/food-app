
import {Component} from 'react';
import Menu from './MenuComponent';
import { addComment, fetchDishes } from '../redux/ActionCreators';

import DishDetail from './DishdetailComponent.js';
import Header from "./HeaderComponent.js";
import Footer from "./FooterComponent.js";
import Home from "./HomeComponent.js";
import {Switch,Redirect,Route,withRouter} from 'react-router-dom';
import Contact from './ContactComponent.js';
import {connect} from 'react-redux';
import About from './AboutComponent.js';
import { actions } from 'react-redux-form';


const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}
const mapDispatchToProps = dispatch => ({
  
  addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
  fetchDishes: () => { dispatch(fetchDishes())},
  resetFeedbackForm: () => { dispatch(actions.reset('feedback'))}
  

});

class Main extends Component {
    constructor(props){
        super(props);
        
    }
    componentDidMount() {
      this.props.fetchDishes();
    }
    onDishSelect(dishId){
        console.log("onDishSelect is clicked")
        console.log(dishId);
       this.setState({selectedDish:dishId});
      
    }
   
  render() {
    const HomePage = () => {
      console.log(this.props.dishes)
      return(
          <Home 
              dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
              dishesLoading={this.props.dishes.isLoading}
              dishesErrMess={this.props.dishes.errMess}
              promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
              leader={this.props.leaders.filter((leader) => leader.featured)[0]}
          />
      );
    }

    const DishWithId = ({match}) => {
      return(
          <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
            isLoading={this.props.dishes.isLoading}
            errMess={this.props.dishes.errMess}
            comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
            addComment={this.props.addComment}
          />
      );
    };
    return (
      <div className="App">
        <Header></Header>
        <Switch>
          <Route exact path="/home" component={HomePage}></Route>
          <Route exact path="/aboutus" component={()=><About leaders={this.props.leaders}/>}></Route>
          <Route exact path="/menu" component={()=><Menu dishes={this.props.dishes}/>}/>
          <Route path='/menu/:dishId' component={DishWithId} />
          <Route exact path='/contactus' component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} />} />
          <Redirect to="/home"></Redirect>
        </Switch>
        {/* <Menu dishes={this.state.dishes} onClick={(dishId)=>this.onDishSelect(dishId)}/>
        <DishDetail dish={this.state.dishes.filter((dish)=>dish.id===this.state.selectedDish)[0]}></DishDetail> */}
        <Footer></Footer>
      </div>
    );
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));