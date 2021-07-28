import React from 'react';
import {skinCodes} from '../../constants/typeCodes';
import { v4 as uuidv4 } from 'uuid';
import * as actionTypes from '../../redux/actionTypes';
import {connect} from 'react-redux';
// import { bindActionCreators } from 'redux';

import { withRouter } from "react-router-dom";
import { useHistory } from "react-router-dom";
function GettingStarted(props) {
    console.log(props);
     let history = useHistory();
     const onChange = async (skinCd) => {
        
         if (props.document.id === null) {
            // Set Work of skin
            let document = {
                id: uuidv4(),
                skinCd
            }
            props.setSkin(document);
        }
        else {
            // Update Work of skin
            props.updateSkin(skinCd);
        }
        history.push('/contact');
      }

      
        return (  
            <div className="container med gettingStarted">
                <div className="section">
                    <h1 className=" center">
                    Select a resume template to get started</h1>
                    <p className=" center">
                    You’ll be able to edit and change this template later!
                    </p>
                    <div className="styleTemplate ">
                    {
                        skinCodes.map((value,index) => {
                            return( <div key={index} className="template-card rounded-border">
                                  <i className={(value == 'demo-value'? 'selected fa fa-check' :'hide') } ></i>
                                <img  className='' src={'/images/' + value + '.svg'}/>
                                <button type="button" onClick={()=>onChange(value)}  className='btn-select-theme'>USE TEMPLATE</button>
                            </div>);
    
                        })
                    }
                    </div>
                
                </div>
            </div>
        );
    
}

const mapStateToProps = (store) => {
    return store;
}

const mapDistpatchToProps = (dispatch) => {
    return {
        setSkin: (document) => {
            dispatch({
                type: actionTypes.SET_SKIN,
                payload: document
            })
        },
        updateSkin: (skinCd) => {
            dispatch({
                type: actionTypes.UPDATE_SKIN,
                payload: skinCd
            })
        }
    }
}
  


export default withRouter(connect(mapStateToProps, mapDistpatchToProps)(GettingStarted));

