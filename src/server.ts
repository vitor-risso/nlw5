import { http, io } from './http'
import './websocket/client'
import './websocket/admin'

http.listen(8080, () => {
  console.log("Server is running on port 8080")
})
