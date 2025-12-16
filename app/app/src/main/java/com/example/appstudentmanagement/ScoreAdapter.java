package com.example.appstudentmanagement;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import java.util.List;

public class ScoreAdapter extends RecyclerView.Adapter<ScoreAdapter.ViewHolder> {

    List<Score> list;

    public ScoreAdapter(List<Score> list) {
        this.list = list;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View v = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.item_score, parent, false);
        return new ViewHolder(v);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder h, int position) {
        Score s = list.get(position);

        h.txtSubjectName.setText(
                s.subject.name + " (" + s.subject.subject_code + ")"
        );

        h.txtScore.setText(
                "GK: " + s.midterm +
                        " | CK: " + s.finalScore +
                        " | Tổng: " + s.total +
                        " | " + s.term + " - " + s.year
        );
    }

    @Override
    public int getItemCount() {
        return list.size();
    }

    static class ViewHolder extends RecyclerView.ViewHolder {
        TextView txtSubjectName, txtScore;

        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            txtSubjectName = itemView.findViewById(R.id.txtSubjectName);
            txtScore = itemView.findViewById(R.id.txtScore);
        }
    }
}
