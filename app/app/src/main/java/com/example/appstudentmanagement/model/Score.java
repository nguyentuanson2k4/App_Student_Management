package com.example.appstudentmanagement.model;

import com.google.gson.annotations.SerializedName;

public class Score {
    public String midterm;
    @SerializedName("final")
    public String finalScore;
    public String total;
    public String term;
    public int year;
    public Subject subject;
}
