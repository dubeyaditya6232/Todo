import React, { useState } from "react";
import { Form, Label, Input, Button, FormFeedback, FormGroup } from 'reactstrap';
import {db} from '../firebase/firebase';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore'

import {useAuth} from '../useContext';

function AddData({ id, setId, state, setState, setFilteredResult, setIsFiltered }) {

    const [touched, setTouched] = useState({
        description: false,
        name: false
    })

    const {user} = useAuth();

    const[submitBtnError,setSubmitBtnError] = useState('');

    let initialErrorState = {
        description: '',
        name: '',
        minLengthName: '',
        maxLengthName: '',
    }

    let error = Object.assign({}, initialErrorState);


    const handleBlur = (value) => {
        setTouched({ ...touched, [value]: true })
    }

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }

    function validate(description, name) {

        if (touched.description && description.length === 0) {
            error.description = 'Description is required'
        }
        if (touched.name && name.length === 0) {
            error.name = 'Name is required'
        }
        if (touched.name && name.length < 3) {
            error.minLengthName = 'Name must be at least 3 characters'
        }
        if (touched.name && name.length > 20) {
            error.maxLengthName = 'Name must be less than 20 characters'
        }

    }

    const addData = async (data) => {
        const collectionRef = collection(db, 'Task');
        await addDoc(collectionRef, data)
            .then(() => {
                error = Object.assign({}, initialErrorState);
                setTouched({ ...touched, description: false, name: false })
                setState({ name: '', description: '', priority: 'Low' });
                setIsFiltered(false);
            })
            .catch(err => { console.log(err) });
    }

    const editData = async (data, id) => {
        const docRef = doc(db, "Task", id)
        await updateDoc(docRef, data)
            .then(() => {
                error = Object.assign({}, initialErrorState);
                setTouched({ ...touched, description: false, name: false })
                setState({ name: '', description: '', priority: 'Low' });
                setFilteredResult([data]);
                setId(-1);
            })
            .catch(err => { console.log(err) });
    }

    function handleSubmit(e) {
        e.preventDefault();
        setSubmitBtnError('');
        let check = e.target.lastElementChild.name;
        if(state.name==='' || state.description===''){
            setSubmitBtnError('Please fill all the fields*');
            return;
        }
        let data = {
            description: state.description,
            name: state.name,
            priority: state.priority?state.priority:'Low',
            userId: user.uid,
        };
        if (check === 'Edit') {
            data.modifiedAt = new Date();
            editData(data, id);
        }
        else if (check === 'Submit') {
            data.createdAt = new Date();
            data.modifiedAt = new Date();
            addData(data);
        }
    }

    return (
        <div className="container addData">
            {validate(state.description, state.name)}
            <h3 className="text-center">Add Task</h3>
            <Form onSubmit={handleSubmit} className="formgroup">
                <FormGroup>
                    <Label htmlFor="name">Task</Label>
                    <Input
                        type="text"
                        value={state.name}
                        valid={error.name === '' || error.minLengthName === '' || error.maxLengthName === ''}
                        invalid={error.name !== '' || error.minLengthName !== '' || error.maxLengthName !== ''}
                        name="name"
                        onBlur={() => handleBlur('name')}
                        onChange={(e) => handleChange(e)}
                    />
                    <FormFeedback>{error.name}</FormFeedback>
                    <FormFeedback>{error.minLengthName}</FormFeedback>
                    <FormFeedback>{error.maxLengthName}</FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="description">Task Description</Label>
                    <Input
                        type="textarea"
                        value={state.description}
                        valid={error.description === ''}
                        invalid={error.description !== ''}
                        name="description"
                        onBlur={() => handleBlur('description')}
                        onChange={(e) => handleChange(e)}
                    />
                    <FormFeedback>{error.description}</FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="priority">Priority</Label>
                    <Input
                        type="select"
                        name="priority"
                        value={state.priority}
                        onChange={(e) => handleChange(e)}
                    >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </Input>
                </FormGroup>
                <Button type="submit" name={(id === -1) ? "Submit" : "Edit"} color="primary" >Submit</Button>
                {(submitBtnError!=='') ? <p className="text-danger">{submitBtnError}</p> : ''}
            </Form>
        </div>
    );
}

export default AddData;
