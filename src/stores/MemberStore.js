import { observable } from "mobx";
import { dbService } from "../firebase";

export const memberStore = observable({
  members: [],
  newMemberKey: "",
  member: {},

  /*************************데이터 fetch 로직****************************/
  fetchMembers() {
    dbService.collection("members")
    .orderBy("added_at")
    .onSnapshot((snapshot) => {
      const docArr = snapshot.docs.map((doc) => ({ ...doc.data() }));
      this.members = docArr;
    });
  },


  fetchMember(id) {
    this.member = dbService
      .collection("members")
      .doc(id)
      .get();
  },



  /*************************데이터 delete 로직****************************/
  deleteMember(id) {
    dbService
      .collection("members")
      .doc(id)
      .delete()
      .then(() => {
        this.fetchMembers();
        console.log("회원지워짐");
      });
  },



  /*************************데이터 add 로직****************************/
  addMember() {
    dbService
      .collection("members")
      .add({
        age: null,
        email: "",
        gender: "",
        name: "",
        signup_date: null,
        added_at: Date.now(),
      })
      .then((docRef) => {
        dbService.collection("members").doc(docRef.id).update({
          key: docRef.id,
        });
        this.newMemberKey = docRef.id;
      })
      .then(() => {
        this.member = dbService
          .collection("members")
          .doc(this.newMemberKey)
          .get();
      })
      .catch((error) => console.log(error));
  },





  /*************************데이터 update 로직****************************/
  updateMember(data) {
    dbService
    .collection("members")
    .doc(data.key)
    .update({...data})
    .then(() => console.log("정보 수정 완료"))
    .catch((error) => console.log(error))
  }
});
