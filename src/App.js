import React, { Component } from 'react';
import './App.css';
//https://www.youtube.com/channel/UCDO7_ZMWAmz_zmbo8EHt0HA
//indracahyae
class App extends Component {

constructor(props){
  super(props);
  /*
  State Properties:
    act:    is for determining 'create' vs 'update'. 0 = create, 1 = update
    index:  is for temporarily tracking current element index in the datas array.
  */
  this.state = {
    title: 'React Simple CRUD Application',
    act: 0,
    index: '',
    datas: []
  }
}

componentDidMount(){
  //set focus on name input at the start.
  this.refs.name.focus();
}

fSubmit = (e) => {
  e.preventDefault();  
  //instantiate local vars with state vars.
  //instantiate local vars with 'refs' attributes from inputs.
  let datas = this.state.datas;
  let name = this.refs.name.value;
  let address = this.refs.address.value;

  if(this.state.act === 0){ 
    //new record
    let data = {
      name, address
    }
    datas.push(data);
  }else{ 
    //update record
    let index = this.state.index;
    datas[index].name = name;
    datas[index].address = address;
  }
  // set state to changed values and reset the type of action back to default 'new'.
  this.setState({
    datas:datas,
    act: 0
  });

  this.refs.myForm.reset();
  this.refs.name.focus();
}

fRemove = (i) => {
  // parameter i gets sent in via 'onclick' event in the input. ie.
  // onClick = {()=>this.fEdit(i)}
  //instantiate local array with current state
  let datas = this.state.datas;
  //remove item at index i
  datas.splice(i,1);
  //then restore state with altered data.
  this.setState({
    datas:datas
  });
  //reset() is a method of react forms
  this.refs.myForm.reset();
  //set forcus back to 'name' field.
  this.refs.name.focus();

}

fEdit = (i) => {
  // parameter i gets sent in via 'onclick' event in the input. ie.
  // onClick = {()=>this.fEdit(i)}
  // set local var data to state array datas at index i.
  let data = this.state.datas[i];
  //apply values sent in by 'refs' to the data object at i.
  this.refs.name.value = data.name;
  this.refs.address.value = data.address;
  //set 'action' to 1 for 'updating' and index to current i,
  // so that when the form 'submits' it will handle as an 'update'.
  this.setState({
    act:1,
    index: i
  })

  this.refs.name.focus();
}


  render() {
    //instantiate local data from state data inside the render function.
    // use the 'ref' attributes for values, an 'onclick' event to call method.
    //*note how used differently on the 'add' form, and the list item actions.
    //use the map function to fill the list items
    let datas = this.state.datas;
    return (
      <div className="App">
         <h2>{this.state.title}</h2>
         <form ref='myForm' className='myForm'>
            <input type="text" ref="name"  placeholder="your name" className="formField" />
            <input type = "text" ref = "address" placeholder="your address" className="formField" />
            <button onClick={this.fSubmit} className="myButton">submit</button>
         </form>
         <pre>
           {datas.map((data,i) => 
              <li key={i} className="myList">
                {i+1}. {data.name} , {data.address}
                <button onClick = {()=>this.fRemove(i)} className="myListButton">remove</button>
                <button onClick = {()=>this.fEdit(i)} className="myListButton">edit</button>

              </li>
           )}
         </pre>
      </div>
    );
  }
}

export default App;
