import {DISHES} from '../shared/Dishes.js';
import {LEADERS} from '../shared/leaders.js';
import {PROMOTIONS} from '../shared/promotions.js';
import {COMMENTS} from '../shared/comments.js';

export const initialState={
          dishes:DISHES,
          comments:COMMENTS,
          promotions:PROMOTIONS,
          leaders:LEADERS

};
export const Reducer=(state=initialState,action)=>{
return state;
    
}