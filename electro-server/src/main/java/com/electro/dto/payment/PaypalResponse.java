package com.electro.dto.payment;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
public class PaypalResponse {
    @JsonProperty("id")
    private String id;

    @JsonProperty("status")
    private OrderStatus status;

    @JsonProperty("links")
    private List<LinkDTO> links;

    @Data
    public static class LinkDTO {
        @JsonProperty("href")
        private String href;

        @JsonProperty("rel")
        private String rel;

        @JsonProperty("method")
        private String method;
    }
}
