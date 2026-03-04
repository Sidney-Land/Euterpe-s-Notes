import java.net.URI;
import java.net.http.*;

public class ENServer {
    
    public static void main(String[] args) {
       
        String url = "https://pdxpdhlnufwrvfnfhznt.supabase.co/rest/v1";
        String path = "/Todos";
        String apiKey = "sb_publishable__eLNoFfkiSY1NLe8l35snA_WFEA1cx6";

        HttpClient client = HttpClient.newHttpClient();

        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create(url + path))
            .header("apikey", apiKey)
            .header("Authorization", "Bearer " + apiKey)
            .header("Content-Type", "application/json")
            .GET()
            .build();

        try {
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() == 200) {
                System.out.println("API Response: " + response.body());
            }
            else {
            System.out.println("API request failed with status code: " + response.statusCode() + " " + response.body());
            }
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }
}
