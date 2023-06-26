import { autorun, observable } from "mobx";
import { dbService } from "../firebase";

export const memberStore = observable({
  members: [],
  isLoading: true,

  /*************************데이터 fetch 로직****************************/
  fetchMembers() {
    dbService
      .collection("members")
      .orderBy("added_at")
      .onSnapshot((snapshot) => {
        const docArr = snapshot.docs.map((doc) => ({ ...doc.data() }));
        this.members = docArr;
        setTimeout(() => {
          this.isLoading = false;
        }, 500);
      });
  },

  fetchMember(id) {
    this.member = dbService.collection("members").doc(id).get();
  },

  /*************************데이터 delete 로직****************************/
  deleteMember(id) {
    this.isLoading = true;
    dbService
      .collection("members")
      .doc(id)
      .delete()
      .then(() => {
        this.fetchMembers();
      });
  },

  /*************************데이터 add 로직****************************/
  // 데이터를 추가와 동시에 편집모드로 전환하기 위하여 빈 값들을 추가한 뒤 문서 id 값을 반환하도록 함
  async addMember() {
    try {
      const docRef = await dbService.collection("members").add({
        age: null,
        email: "",
        gender: "",
        name: "",
        signup_date: null,
        added_at: Date.now(),
      });

      await docRef.update({
        key: docRef.id,
      });

      return docRef.id;
    } catch (error) {
      throw error;
    }
  },

  /*************************데이터 update 로직****************************/
  updateMember(data) {
    this.isLoading = true;

    dbService
      .collection("members")
      .doc(data.key)
      .update({ ...data })
      .then(() => {
        this.fetchMembers();
      })
      .catch((error) => console.log(error));
  },
});
