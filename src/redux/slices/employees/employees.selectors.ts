// export const selectVisibleContacts = createSelector(
//   [selectContacts, selectFilter],
//   (contactsName, contactsFilter) => {
//     return contactsName.filter((contact) => {
//       if (contactsFilter.trim() === '') {
//         return contact;
//       }
//       return contact.name.toLowerCase().includes(contactsFilter.toLowerCase());
//     });
//   }
// );
