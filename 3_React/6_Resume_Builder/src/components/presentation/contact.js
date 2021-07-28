import React,{useState,useEffect} from "react";
import {NavLink} from "react-router-dom";
// import update from 'immutability-helper';
import {fieldCd, skinCodes}  from '../../constants/typeCodes';
// import * as contactActions from '../../actions/contactActions';
// import { bindActionCreators } from 'redux';
// import { withRouter } from "react-router-dom";
import { useHistory } from "react-router-dom";
import ResumePreview from './resumePreview'
// import { connect } from "react-redux";

function Contact(props) {
   let history = useHistory();

   // We set an object to map details of the skin through contact object

   const [contact,setContact]= useState(props.contactSection);
//    useEffect(() => {
//        if(!props.document || !props.document.id || !props.document.skinCd)
//        {
//            history.push('/getting-started')
//        }
//    }, [])
  const onchange=(event)=>{
        var key =event.target.name;
        var val =event.target.value;
        // this.setState({contactSection:update(this.state.contactSection,{$merge: {[key]:val}})});

        // We override with the new value if key exists,
        // else creates key with new value
        setContact({...contact,[key]:val})
    }
    const onSubmit= async()=>{
        // if(props.contactSection!=null){
        //     props.updateContact(props.document.id,contact);
        // }
        // else{
        //     props.addContact(props.document.id,contact);
        // }

        history.push('/education');
    }


    // Retrieves data if the specified object and the specified key exists,
    // to set the detail for the required input field 
    const getFieldData=(key)=>{
        if(contact && contact[key]){
          return contact[key]
        }
        return "";
    }
    
    // Below we have all of the input fields, 
    // to enter the details and manipulate in contact object which has details for the skin.
    // State is managed with object and key-value pairs instead of seperate state variables,
    // this tends to sound code in a cleaner way.
    return (
          <div className="container med contact">
            <div className="section funnel-section">
                <div className="form-card">
                    <h2 className="form-heading center">Personal Details</h2>
                    <div className="form-section">
                        <div className="input-group"><label>First Name</label>
                            <div className="effect"><input type="text" name={fieldCd.FirstName} value={getFieldData(fieldCd.FirstName)}  onChange={onchange}  /><span></span>
                            </div>
                            <div className="error"></div>
                        </div>

                        <div className="input-group"><label>Last Name</label>
                            <div className="effect"><input type="text" name={fieldCd.LastName}  value={getFieldData(fieldCd.LastName)}  onChange={onchange}/><span></span>
                            </div>
                            <div className="error"></div>
                        </div>

                        <div className="input-group full"><label>Professional Summary</label>
                            <div className="effect"><input type="text" name={fieldCd.ProfSummary}   value={getFieldData(fieldCd.ProfSummary)}  onChange={onchange}/><span></span>
                            </div>
                            <div className="error"></div>
                        </div>

                        <div className="input-group"><label>Email</label>
                            <div className="effect"><input type="text"  name={fieldCd.Email}  value={getFieldData(fieldCd.Email)}  onChange={onchange} /><span></span>
                            </div>
                            <div className="error"></div>
                        </div>

                        <div className="input-group"><label>Phone</label>
                            <div className="effect"><input type="text"  name={fieldCd.Phone}   value={getFieldData(fieldCd.Phone)}  onChange={onchange}/><span></span>
                            </div>
                            <div className="error"></div>
                        </div>

                        <div className="input-group"><label>Profession</label>
                            <div className="effect"><input type="text"  name={fieldCd.Profession}  value={getFieldData(fieldCd.Profession)}  onChange={onchange}/><span></span>
                            </div>
                            <div className="error"></div>
                        </div>
                        <div className="input-group"><label>Street</label>
                            <div className="effect"><input type="text" name={fieldCd.Street}   value={getFieldData(fieldCd.Street)}  onChange={onchange}/><span></span>
                            </div>
                            <div className="error"></div>
                        </div>

                        <div className="input-group"><label>City</label>
                            <div className="effect"><input type="text" name={fieldCd.City}  value={getFieldData(fieldCd.City)}  onChange={onchange}/><span></span>
                            </div>
                            <div className="error"></div>
                        </div>

                        <div className="input-group"><label>State</label>
                            <div className="effect"><input type="text"   name={fieldCd.State}  value={getFieldData(fieldCd.State)}  onChange={onchange} /><span></span>
                            </div>
                            <div className="error"></div>
                        </div>


                        <div className="input-group"><label>Country</label>
                            <div className="effect"><input type="text"  name={fieldCd.Country}  value={getFieldData(fieldCd.Country)}  onChange={onchange}/><span></span>
                            </div>
                            <div className="error"></div>
                        </div>
                        <div className="input-group"><label>Pin Code</label>
                            <div className="effect"><input type="text" name={fieldCd.ZipCode}  value={getFieldData(fieldCd.ZipCode)}  onChange={onchange}/><span></span>
                            </div>
                            <div className="error"></div>
                        </div>
                        <div className="form-buttons">
                            <button onClick={onSubmit} className="btn hvr-float-shadow" type='button'>Next</button>
                            <NavLink to='/getting-started'  className="center">Back</NavLink>
                        </div>
                    </div>

                </div>

                <div className="preview-card">
                    <ResumePreview contactSection={contact} skinCd={props?.document?.skinCd}></ResumePreview>
                </div>

            </div>
        </div>
    );
}


export default Contact

