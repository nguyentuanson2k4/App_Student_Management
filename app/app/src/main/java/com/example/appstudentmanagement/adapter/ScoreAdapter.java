package com.example.appstudentmanagement.adapter;

import android.view.*;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;
import java.util.List;
import com.example.appstudentmanagement.model.Score;
import com.example.appstudentmanagement.R;

public class ScoreAdapter extends RecyclerView.Adapter<ScoreAdapter.ViewHolder> {

    private List<Score> list;

    public ScoreAdapter(List<Score> list) {
        this.list = list;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup p, int v) {
        return new ViewHolder(LayoutInflater.from(p.getContext())
                .inflate(R.layout.item_score, p, false));
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder h, int pos) {
        Score s = list.get(pos);
        h.txtSubject.setText(s.subject.name + " (" + s.subject.subject_code + ")");
        h.txtScore.setText(
                "GK: " + s.midterm +
                        " | CK: " + s.finalScore +
                        " | Tổng: " + s.total +
                        " | " + s.term + " - " + s.year
        );
    }

    @Override
    public int getItemCount() { return list.size(); }

    static class ViewHolder extends RecyclerView.ViewHolder {
        TextView txtSubject, txtScore;
        ViewHolder(View v) {
            super(v);
            txtSubject = v.findViewById(R.id.txtSubjectName);
            txtScore = v.findViewById(R.id.txtScore);
        }
    }
}
