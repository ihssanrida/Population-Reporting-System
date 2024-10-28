# Population-Report-System
A web application for reporting world population statistics. The application provides various reports about countries and cities based on population data, using an SQL database as the source.

### Use Case Diagram
![Example Image](images/Population_reporting_System_Use_Case_Diagram.png)

## Technical Requirements

- **Frontend:** HTML/PUG
- **Backend:** Node.js with Express.js
- **Database:** MySQL 
- **Version Control:** Git 
- **Deployment:** Docker containers

## Setup Instructions

### Prerequisites

Ensure you have the following installed:
- Docker
- Node.js (version 18 or higher)
- Git

### Clone the Repository

```bash
git clone https://github.com/your-username/population-report-system.git
cd population-report-system

## Database Setup

The project uses a MySQL database with the `world-db.zip` dataset:

1. **Download the database**: https://downloads.mysql.com/docs/world-db.zip.
2. **Unzip** the downloaded file and place the SQL files in the `src/db/init` directory.
3. The database will be automatically initialized by the Docker `db` service on startup.

## Docker Setup

The application uses Docker for simplified deployment. The services are defined in the `docker-compose.yml` file.

### Docker Services

- **`db`**: Runs the MySQL database container.
- **`web`**: Runs the Node.js backend application container.

### Running the Application

To start the application, follow these steps:

1. **Build and start the Docker containers**:
   ```bash
   docker-compose up --build
**To stop**: docker-compose down  


