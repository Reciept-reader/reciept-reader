# Reciept Reader
The Reciept Reader project is a 3 section project for the CS 481 Capstone class. The purpose of this project is to allow users to keep track of their expenses by gathering important information from the reciepts of the stores that they shop from.

### Features
- Ability to read reciepts (images, pdfs) and intelligently extract purchase information such as name, quantility, category, price, date etc.
- Ability to scan and process reciepts from different major stores including: Walmart, Safeway, FredMeyer, GroceryOutlet
- Ability to let users know of unknown item name/price read from reciept and to allow user to edit it and save configuration for future use

## Project Organization
- AgendaMinutes/ - Contains all the minutes from the team meetings
- ClientMinutes/ -  Contains all the minutes from the meetings with the client
- docker-container/ - Contains the most up to date code for containing the tesseract OCR in a docker image
  - Find the container already built as an image here: https://hub.docker.com/repository/docker/ibrahimsydock/tesseract-receipt-reader/general

## Installation From Repo

1. Download the repository as a zip file
2. Unzip the contents and place in whichever directory you like
3. Naviagte to the ./MobileApp directory
4. Open a new terminal or one already in use
5. Enter the commad "npm i" (without quotes). This will download the dependencies required to run the application.
6. The enter the "npm start" command to start running the project
7. After the project is running, a QR code will be printined to the terminal. 
   - Either download [Expo Go] {https://expo.dev/client} on your mobile device and scan the code,
   - OR can be run through an emulator (such as [Andriod Studio] {https://developer.android.com/studio} installed on your device.
9. NOTE: The mobile device and computer must be running on the **same** exact network
10. Enjoy the data returned from scanning any receipt you take a photo of!

## Technologies

- Tesseract OCR
- Docker
- AWS EC2
- Supabase
- Figma
- React Native
- EXPO

### Development Software & Version Control

- VS Code
- XCode
- Android Studio
- React Native Chart Kit
- Git
- Github

## Team Members
- Jacob Fisher https://github.com/jacobfisher311
- Mason Ringbom https://github.com/Sushi-Roll-17
- Nathnael Seleba https://github.com/Nathnael7
- Julio Espinola Rodas https://github.com/JulioSEspinola
- Jatinder Singh https://github.com/Tennerr
- Ibrahim Sydock https://github.com/sharktrexer
- Ichinnorov Tuguldur https://github.com/IchinnorovTuguldur
- William Ent https://github.com/Went343
- Brian Johnson

## License

[MIT](https://choosealicense.com/licenses/mit/)
