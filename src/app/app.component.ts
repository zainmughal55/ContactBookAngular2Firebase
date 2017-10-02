import { Component } from '@angular/core';
declare var firebase: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css','./customStyleSheet.css']
})
export class AppComponent {

	name="";
	email="";
	phone="";

	MethodSwaping="Submit";// change Submit Method to Update and Update To Submit
	CurrentIndex:number;// capture index value when edit method call



	Arr=[];

	ngOnInit()
	{
		this.fbGetData();
	}
	
	public Submit()
	{
		if(this.name !== '' && this.email !== '' && this.phone !== ''){

		firebase.database().ref('/').push({name:this.name, email:this.email, phone:this.phone});
		
		this.name='';
		this.email='';
		this.phone='';
		
		}
	}
	public Edit(i)
	{
		// assign values to form input  fields 
		this.name=this.Arr[i].name;
		this.email=this.Arr[i].email;
		this.phone=this.Arr[i].phone;

		//getting value of selected index
		this.CurrentIndex=i;
		this.MethodSwaping="UpdateMethod";
	}
	public UpdateMethod()
	{
		//changing the old value with new one 
		
		this.name='';
		this.email='';
		this.phone='';

		this.MethodSwaping="Submit";
	}

	fbGetData() {
    firebase.database().ref('/').on('child_added',
        (snapshot) => {this.Arr.push(snapshot.val());
        }
    );
  }

}
