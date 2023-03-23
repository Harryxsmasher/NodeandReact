import axios from "axios";
import { useEffect, useState } from "react";

function Student() {
    const [id, setId] = useState('');
    const [stname, setName] = useState("");
    const [course, setCourse] = useState("");
    const [fee, setFee] = useState("");


    const [students, setUsers] = useState([]);

    useEffect(() => {
        (async () => await Load())();
    }, []);



    async function Load() {
        const res = await fetch( "http://localhost:8085/get")
        const data = await res.json()
        await setUsers(data.data)
        console.log(students)

        // await setUsers(data)
        // const result = await axios.get(
        //     "http://localhost:8085/get")

        // setUsers(result.data.data)
        // console.log(students)
    }

    async function save(event) {
        event.preventDefault();
        try {
            await axios.post("http://localhost:8085/post/",
                {

                    stname: stname,
                    course: course,
                    fee: fee

                });
            
            alert("Student Registation Successfully");


            Load();

        }
        catch (err) {
            alert("User Registation Failed");
        }
    }
    async function editStudent(students) {
        setName(students.stname);
        setCourse(students.course);
        setFee(students.fee);
        setId(students.id);
        console.log(course)

    }
    


    async function DeleteStudent(id) {

        await axios.delete("http://localhost:8085/delete/" + id);
        alert("Student deleted Successfully");
        Load();

    }



    async function update(event) {
        event.preventDefault();

        try {
            
            console.log("http://localhost:8085/put/" + students.find(u => u.id === id).id || id,
            {
                id: id,
                stname: stname,
                course: course,
                fee: fee


            })

            await axios.put("http://localhost:8085/put/" + students.find(u => u.id === id).id || id,
                {
                    id: id,
                    stname: stname,
                    course: course,
                    fee: fee


                }
               
                );
            console.log(course)
            alert("Registation Updateddddd");


        }
        catch (err) {
            alert(" Registation Failed");
        }
    }



    return (
        <div>
            <h1>Student Details</h1>
            <div class="container mt-4" >
                <form>
                    <div class="form-group">
                        <input type="text" class="form-control" id="student_id" hidden
                            value={id}
                            onChange={(event) => {
                                setId(event.target.value);
                            }}

                        />
                        <label>Student Name</label>
                        <input type="text" class="form-control" id="name"
                            value={stname}
                            onChange={(event) => {
                                setName(event.target.value);
                            }}
                        />
                    </div>
                    <div class="form-group">
                        <label>Course</label>
                        <input type="text" class="form-control" id="course"
                            value={course}
                            onChange={(event) => {
                                setCourse(event.target.value);
                            }}
                        />
                    </div>

                    <div class="form-group">
                        <label>Fee</label>
                        <input type="text" class="form-control" id="fee"
                            value={fee}
                            onChange={(event) => {
                                setFee(event.target.value);
                            }}
                        />
                    </div>

                    <div>
                        <button class="btn btn-primary mt-4" onClick={save}>Register</button>
                        <button class="btn btn-warning mt-4" onClick={update}>Update</button>
                    </div>
                </form>
            </div>

            <table class="table table-dark" align="center">
                <thead>
                    <tr>
                        <th scope="col">Student Id</th>
                        <th scope="col">Student Name</th>
                        <th scope="col">Course</th>
                        <th scope="col">Fee</th>

                        <th scope="col">Option</th>
                    </tr>
                </thead>
                {students.map(function fn(student) {
                    return (
                        <tbody>
                            <tr>
                                <th scope="row">{student.id} </th>
                                <td>{student.stname}</td>
                                <td>{student.course}</td>
                                <td>{student.fee}</td>
                                <td>
                                    <button type="button" class="btn btn-warning" onClick={() => editStudent(student)} >Edit</button>
                                    <button type="button" class="btn btn-danger" onClick={() => DeleteStudent(student.id)}>Delete</button>
                                </td>
                            </tr>
                        </tbody>
                    );
                })}
            </table>
        </div>
    );
}

export default Student;