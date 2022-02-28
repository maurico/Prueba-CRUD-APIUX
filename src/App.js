import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter} from 'reactstrap';
import { Formik } from 'formik';

const test = [
  {id: 1, tipoDeTarea: "desarrollo", tarea: "Crear Api Rest", responsable: "Mauricio"},
  {id: 2, tipoDeTarea: "desarrollo web", tarea: "Crear pagina web", responsable: "Cristian"},
  {id: 3, tipoDeTarea: "base de datos", tarea: "Actualizar base de datos", responsable: "Ivan"},
  {id: 4, tipoDeTarea: "desarrollo", tarea: "Crear App en java", responsable: "Natalia"},
  {id: 5, tipoDeTarea: "redes", tarea: "Crear estructura de red", responsable: "Daniel"},
  {id: 6, tipoDeTarea: "base de datos", tarea: "Migrar base de datos", responsable: "Hugo"},
  {id: 7, tipoDeTarea: "desarrollo web", tarea: "Corregir errores", responsable: "Ignacio"},
  {id: 8, tipoDeTarea: "redes", tarea: "Revizar red", responsable: "Maria"}
]

class App extends React.Component{
    state={
      test: test,
    form:{
      id:'',
      tipoDeTarea:'',
      tarea:'',
      responsable:''
    },
    modalInsertar: false,
    modalEditar: false,
  }

  handleChange=e=>{
    this.setState({
      form:{
        ...this.state.form,
        [e.target.name]: e.target.value,
      }
    });
   }

   mostrarModalInsertar=()=>{
     this.setState({modalInsertar:true})
   }

   cerrarModalInsertar=()=>{
    this.setState({modalInsertar:false})
  }

  mostrarModalEditar=(registro)=>{
    this.setState({modalEditar:true, form: registro})
  }

  cerrarModalEditar=()=>{
   this.setState({modalEditar:false})
 }

  insertar=()=>{
    var valor={...this.state.form};
    valor.id=this.state.test.length+1;
    var lista=this.state.test;
    lista.push(valor);
    this.setState({test: lista, modalInsertar: false})
  }

  editar=(dato)=>{
    var contador = 0;
    var lista = this.state.test;
    lista.map((registro)=>{
      if(dato.id===registro.id){
        lista[contador].tipoDeTarea=dato.tipoDeTarea;
        lista[contador].tarea=dato.tarea;
        lista[contador].responsable=dato.responsable;
      }
      contador++;
    });
    this.setState({test: lista, modalEditar: false});
  }

  eliminar=(dato)=>{
    var opcion=window.confirm("Estas seguro que quieres eliminar el registro " + dato.id);
    if(opcion === true){
      var contador=0;
      var lista = this.state.test
      lista.map((registro)=>{
        if(dato.id === registro.id){
          lista.splice(contador, 1);
        }
        contador++;
      });
      this.setState({test: lista})
    }
  }

  render(){
    return(
      <>
      <Container>
        <br />
        <Button color="success" onClick={()=>this.mostrarModalInsertar()}>Insertar nueva tarea</Button>
        <br /><br />
        <Table>
          <thead><tr><th>id</th>
          <th>Tipo De Tarea</th>
          <th>Tarea</th>
          <th>Responsable</th>
          <th>Acciones</th></tr></thead>
          <tbody>
            {this.state.test.map((elemento)=>(
              <tr>
                <td>{elemento.id}</td>
                <td>{elemento.tipoDeTarea}</td>
                <td>{elemento.tarea}</td>
                <td>{elemento.responsable}</td>
                <td>
                  <Button color="primary" onClick={()=>this.mostrarModalEditar(elemento)}>Editar</Button>
                  {"  "}
                  <Button color="danger" onClick={()=>this.eliminar(elemento)}>Eliminar</Button></td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
      <Modal isOpen={this.state.modalInsertar}>
        <ModalHeader>
          <div>
            <h3>Insertar Tarea</h3>
          </div>
        </ModalHeader>

        <ModalBody>
          <FormGroup>
            <label >Id:</label>
            <input className="form-control" readOnly type="text" value={this.state.test.length+1}></input>
          </FormGroup>

          <FormGroup>
            <label>Tipo de tarea:</label>
            <input className="form-control" name="tipoDeTarea" type="text" required onChange={this.handleChange} ></input>
          </FormGroup>

          <FormGroup>
            <label>Tarea:</label>
            <input className="form-control" name="tarea" type="text" required onChange={this.handleChange}></input>
          </FormGroup>

          <FormGroup>
            <label>Responsable:</label>
            <input className="form-control" name="responsable" type="text" required onChange={this.handleChange} ></input>
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button color="primary" onClick={()=>this.insertar()}>Insertar</Button>
          <Button color="danger" onClick={()=>this.cerrarModalInsertar()}>Cancelar</Button>
        </ModalFooter>

      </Modal>

      <Modal isOpen={this.state.modalEditar}>
        <ModalHeader>
          <div>
            <h3>Editar Tarea</h3>
          </div>
        </ModalHeader>

        <ModalBody>
          <FormGroup>
            <label>Id:</label>
            <input className="form-control" readOnly type="text" value={this.state.form.id}></input>
          </FormGroup>

          <FormGroup>
            <label>Tipo de tarea:</label>
            <input className="form-control" name="tipoDeTarea" type="text" value={this.state.form.tipoDeTarea} required onChange={this.handleChange} ></input>
          </FormGroup>

          <FormGroup>
            <label>Tarea:</label>
            <input className="form-control" name="tarea" type="text" value={this.state.form.tarea} required onChange={this.handleChange}></input>
          </FormGroup>

          <FormGroup>
            <label>Responsable:</label>
            <input className="form-control" name="responsable" type="text" value={this.state.form.responsable} required onChange={this.handleChange} ></input>
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button color="primary" onClick={()=>this.editar(this.state.form)}>Editar</Button>
          <Button color="danger" onClick={()=>this.cerrarModalEditar()}>Cancelar</Button>
        </ModalFooter>

      </Modal>
      </>
    )
  }
}

export default App;
