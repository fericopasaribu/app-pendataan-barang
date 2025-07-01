# Goods Data Collection App

A mobile application for managing goods data built using NextJS and React Native.

## Tech Stack

- **Programming Language**:
  - Backend: NextJS (v15.3.4)
  - Frontend: React Native (v0.79.4)  
- **UI Libraries**: React Native Paper (v5.14.5)  
- **ORM**: Prisma (v6.10.1) 
- **Database**: PostgreSQL (v16.9)

---

## Setup Instructions

### 1. Open Terminal / Console

Start by opening your terminal or command prompt.

### 2. Clone the Repository

   ```bash
   git clone https://github.com/fericopasaribu/pendataan-barang.git
   cd pendataan-barang
   ```
### 3. Backend Setup

- Open your terminal and navigate to the folder where the cloned project is located.
- Navigate to the ```bash api ``` Folder
    ```bash
    cd api
    ```
- Run the following command to install dependencies
    ```bash
    npm i
    ```
- Open the ```bash .env ``` file inside the api folder and update the DATABASE_URL configuration to match your PostgreSQL username, password, and database name.
    ```bash
    DATABASE_URL="postgresql://username:password@localhost:5432/db_barang?schema=public"
    ```
- Run the following command to apply the database migrations
    ```bash
    npx prisma migrate dev
    ```
- Run the following command in the terminal
    ```bash
    npm run dev
    ```

### 4. Frontend Setup

- Change the URL in the Strings.ts file inside the constants folder and adjust it to match the IP address of the device/emulator and the laptop/PC
    ```bash
    const url = "http://192.168.1.12:3001"
    ```
- Run the following command to install dependencies
    ```bash
    npm i
    ```
- Run the following command in the terminal
  Android
    ```bash
    npm run android
    ```
  iOS
    ```bash
    npm run ios
    ```
