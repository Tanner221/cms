import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {

  messages : Message[] = [
    new Message('1', 'New Subject', 'Message Text', 'Tanner Robinson'),
    new Message('2', 'New Subject', 'Message Text 2', 'Tanner Robinson')
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
