import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div>
        <h1>Hello Everyone</h1>
        <p>This the onboarding project of MVP Studio. It has been build using the following technologies</p>
        <ul>
          <li><a href='https://get.asp.net/'>ASP.NET Core</a> and <a href='https://msdn.microsoft.com/en-us/library/67ef8sbd.aspx'>C#</a> for cross-platform server-side code</li>
          <li><a href='https://facebook.github.io/react/'>React</a> for client-side code</li>
          <li><a href='http://getbootstrap.com/'>Semanti-UI</a> for layout and styling</li>
        </ul>
        <p>To get started, Please navigate using the navbar on the header</p>
        <ul>
         
        </ul>
       
      </div>
    );
  }
}
