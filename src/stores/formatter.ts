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
        const jsonData: any = JSON.parse(jsonString.replace(/\s/g, ''));
        const csvRows: string[] = [];
    
        const processRow = (row: any, path: string = ''): void => {
          Object.keys(row).forEach((key) => {
            const value = row[key];
    
            if (Array.isArray(value)) {
              value.forEach((item: any, index: number) => {
                const newPath = path ? `${path}.${key}[${index}]` : `${key}[${index}]`;
                processRow(item, newPath);
              });
            } else if (typeof value === 'object' && value !== null) {
              const newPath = path ? `${path}.${key}` : key;
              processRow(value, newPath);
            } else {
              const csvValue = typeof value === 'string' ? `"${value}"` : value;
              csvRows.push(`${path ? `${path}.` : ''}${key},${csvValue}`);
            }
          });
        };
    
        processRow(jsonData);
    
        const csvHeader: string = Object.keys(jsonData).join(",");
        return `${csvHeader}\n${csvRows.join("\n")}`;
      } catch (error) {
        console.error('Invalid JSON string:', error);
        return '';
      }
    },
    exportAsFile(text: string, filename: string) {
      const blob = new Blob([text], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      
      const anchorElement = document.createElement('a');
      anchorElement.href = url;
      anchorElement.download = filename;
      anchorElement.click();
      
      // Clean up the created URL object
      URL.revokeObjectURL(url);
    }
  },
})