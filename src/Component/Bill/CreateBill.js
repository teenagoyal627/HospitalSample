import classes from "./CreateBill.module.css";
import Card from "../UI/Card";
import { useState } from "react";
import { useHistory } from "react-router";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../Firebase";
import { red } from "@mui/material/colors";

const blankFields = {
    // date: "",
    // patientName: "",
    // mobileNumber: "",
    // doctorName: "",
    // hospitalName: "",
    // address: "",
    sno:"",
    medicineName:"",
    quantity:"",
    price:""

};

function CreateBill(props) {


    const [formFields, SetFormFields] = useState({
        date: "",
        patientName: "",
        mobileNumber: "",
        doctorName: "",
        hospitalName: "",
        address: "",
        inputFields: [blankFields],
    });

    // console.log("formFields", formFields);
    const history = useHistory();

    const setField = (fieldName, value) => {

        SetFormFields(prev => ({
            ...prev,
            [fieldName]: value
        }))
    }
    const createHandler = async (event) => {
        event.preventDefault();
        
        SetFormFields((prev) => ({ ...prev, ...blankFields }));

        //this is for store the data in firestore
        await addDoc(collection(db, "CreateBillDetails"), {
            Date: formFields.date,
            PatientName: formFields.patientName,
            MobileNumber: formFields.mobileNumber,
            DoctorName: formFields.doctorName,
            HospitaName: formFields.hospitalName,
            Address: formFields.address,
            MedicineEntries: formFields.inputFields,
        });
        console.log(formFields.date);
        history.replace("/allBill");
    };

    const addFields = () => {
        let newfield = [{ sn: "", medicineName: "", quantity: "", price: "" }];
        SetFormFields((prev) => ({
            ...prev,
            inputFields: [...prev.inputFields, newfield],
        }));
    };
    const removeFields = (index) => {
        SetFormFields(prev => ({
            ...prev,
            inputFields: prev.inputFields.filter((_, idx) => idx !== index)
        }))
    };
    const handleTableChange = (index, event) => {

        SetFormFields(prev => ({
            ...prev, inputFields:

                prev.inputFields.map((input, inIdx) => {
                    if (index === inIdx) {
                        input[event.target.name] = event.target.value;
                    }
                    return input;
                })
        }));
    };
    return (
        <Card style={{ height: 50, backgroundColor: red }}>
            <form className={classes.form} onSubmit={createHandler}>
                <div className={classes.control}>
                    <div className={classes.control}>
                        <label htmlFor="date"> Date</label>
                        <input
                            type="date"
                            name="date"
                            required
                            id="date"
                            value={formFields.date}
                            onChange={(event) => setField("date", event.target.value)}
                        />
                    </div>
                    <label htmlFor="patientName">Patient Name</label>
                    <input
                        type="text"
                        name="patientName"
                        required
                        id="patientName"
                        value={formFields.patientName}

                        onChange={(event) => setField("patientName", event.target.value)}
                    />
                </div>

                <div className={classes.control}>
                    <label htmlFor="mobileNumber">Mobile Number</label>
                    <input
                        type="number"
                        name="mobileNumber"
                        required
                        id="mobileNumber"
                        value={formFields.mobileNumber}
                        
                        onChange={(event) => setField("mobileNumber", event.target.value)}
                    />
                </div>
                <div className={classes.control}>
                    <label htmlFor="doctorName"> Doctor Name</label>
                    <input
                        type="text"
                        name="doctorName"
                        required
                        id="doctorName"
                        value={formFields.doctorName}

                        onChange={(event) => setField("doctorName", event.target.value)}
                    />
                </div>
                <div className={classes.control}>
                    <label htmlFor="hospitalName"> Hospital Name</label>
                    <input
                        type="text"
                        name="hospitalName"
                        required
                        id="hospitalName"
                        value={formFields.hospitalName}

                        onChange={(event) => setField("hospitalName", event.target.value)}
                    />
                </div>
                <div className={classes.control}>
                    <label htmlFor="address">Address</label>
                    <input
                        type="text"
                        name="address"
                        required
                        id="address"
                        value={formFields.address}

                        onChange={(event) => setField("address", event.target.value)}
                    />
                </div>
                <div>
                    {formFields.inputFields.map((input, index) => {
                        return (
                            <div key={"inputFields-" + index}>
                                <input
                                    style={{ padding: 3, width: 50, height: 40 }}
                                    type="number"
                                    name="sn"
                                    placeholder="s.n"
                                    value={input.sn}
                                    onChange={(event) => handleTableChange(index, event)}
                                // onChange={(event)=>setInputFields(event.target.value)}
                                />
                                <input
                                    style={{ padding: 3, width: 200, height: 40 }}
                                    type="text"
                                    name="medicineName"
                                    placeholder="medicine name"
                                    value={input.medicineName}
                                    onChange={(event) => handleTableChange(index, event)}
                                // onChange={(event)=>setInputFields(event.target.value)}
                                />
                                <input
                                    style={{ padding: 3, width: 200, height: 40 }}
                                    type="number"
                                    name="quantity"
                                    placeholder="Quantity"
                                    value={input.quantity}
                                    onChange={(event) => handleTableChange(index, event)}
                                // onChange={(event)=>setInputFields(event.target.value)}
                                />
                                <input
                                    style={{ width: 200, height: 40 }}
                                    type="number"
                                    name="price"
                                    placeholder="Price"
                                    value={input.price}
                                    onChange={(event) => handleTableChange(index, event)}
                                // onChange={(event)=>setInputFields(event.target.value)}
                                />
                                {/* {console.log(inputFields.medicineName)} */}
                                <button onClick={() => removeFields(index)}>Remove</button>
                            </div>
                        );
                    })}
                    <button  type="button" onClick={addFields}>Add more</button>
                </div> 

                <div className={classes.actions}>
                    <button type="submit">Create Bill</button>
                </div>
            </form>
        </Card>
    );
}
export default CreateBill;


// NOW ENJOY AND MAKE SURE TO REMEMBER ME IN YOUR PRAYERS :)
//wait i have also one more problem ok