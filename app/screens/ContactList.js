import React, { Component } from 'react';
import { TextInput, View, AsyncStorage, ListView, Text, TouchableHighlight, DatePickerIOS, ScrollView, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import styles from '../styles/main';
import SearchContacts from '../components/SearchContacts';
import Button from '../components/Button';
import ContactCard from '../components/ContactCard';
import moment from 'moment';
import firebase, { contactsRef, provider } from '../firebase';
import split from 'split-object';

export default class ContactList extends Component {
  constructor(props) {
  super(props);
    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
      contacts: [],
      searchInput: ''
    };
  }

  componentDidMount() {
    contactsRef.on('value', (snapshot) => {
      let contacts = snapshot.val();
      if(!contacts) { return this.setState({ contacts: [] }); }
      contacts = split(contacts).map(contact => ({ key: contact.key }, contact.value));
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(contacts),
        contacts
      });
    });
  }

  filterContacts(searchInput, contacts) {
  let search = searchInput.toLowerCase();
  return filter(contacts, (c) => {
    let contact = c.body.toLowerCase();
      return contact.search(text) !== -1;
    });
  }

  render() {
    return (
      <View style={styles.contactList}>
        <SearchContacts
          value={this.state.searchInput}
          onChangeText={searchInput => this.setState({searchInput})}
        />
        <ListView
          enableEmptySections
          dataSource={this.state.dataSource}
          renderRow={(contacts) => <ContactCard {...contacts}/>}
        />
      </View>
    );
  }
}
