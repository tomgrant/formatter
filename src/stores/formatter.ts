import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

/*

{
  "name": "John Doe",
  "age": 25,
  "city": "New York",
  "email": "johndoe@example.com",
  "hobbies": ["reading", "cooking", "travelling"],
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipcode": "10001"
  }
}

{"name":"John Doe","age":25,"city":"New York","email":"johndoe@example.com","hobbies":["reading","cooking","travelling"],"address":{"street":"123 Main St","city":"New York","state":"NY","zipcode":"10001"}}

*/

export const useFormatterStore = defineStore('formatter', {
  state: () => ({ inputBody: '', outputBody: '' }),
  getters: {},
  actions: {
    convertStringToJSON(jsonString: string) {
      try {
        const jsonObject = JSON.parse(jsonString);
        const formattedJSON = this.formatJSON(jsonObject);
        return formattedJSON;
      } catch (error) {
        console.error("Invalid JSON string:", error);
        return null;
      }
    },
    formatJSON(jsonData: object) {
      return JSON.stringify(jsonData, null, 2);
    },
    convertJSONToCSV(jsonString: string): string {
      try {
        const jsonData: any[] = [JSON.parse(jsonString.replace(/\s/g, ''))];
        const keys: string[] = Object.keys(jsonData[0]);
        const csvHeader: string = keys.join(",");
        const csvRows: string[] = jsonData.map((row: any) => {
          return keys.map((key: string) => {
            return row[key];
          }).join(",");
        });
        return `${csvHeader}\n${csvRows.join("\n")}`;
      } catch (error) {
        console.error('Invalid JSON string:', error);
        return '';
      }
    }
  },
})