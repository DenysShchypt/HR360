export const selectAllEmployees = (state) => state.employees.employees;
export const selectEmployee = (state) => state.employees.employee;
export const selectIsLoading = (state) => state.employees.isLoading;

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
