package com.example.appstudentmanagement.adapter;

import android.view.*;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.core.content.ContextCompat;
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

        h.txtSubjectName.setText(s.subject.name);
        h.txtSubjectCode.setText(s.subject.subject_code);
        h.txtCredit.setText(s.subject.credit + " tín chỉ");
        h.txtTermYear.setText(s.term + " - " + s.year);

        h.txtMidterm.setText(s.midterm);
        h.txtFinal.setText(s.finalScore);
        h.txtTotal.setText(s.total);

        // Set status
        try {
            double totalScore = Double.parseDouble(s.total);
            if (totalScore >= 5.0) {
                h.txtStatus.setText("ĐẬU");
                h.txtStatus.setBackgroundResource(R.drawable.bg_status_passed);
                h.txtStatus.setTextColor(ContextCompat.getColor(h.itemView.getContext(), R.color.success));
            } else {
                h.txtStatus.setText("RỚT");
                h.txtStatus.setBackgroundResource(R.drawable.bg_status_failed);
                h.txtStatus.setTextColor(ContextCompat.getColor(h.itemView.getContext(), R.color.error));
            }
        } catch (NumberFormatException e) {
            h.txtStatus.setText("CHƯA CÓ");
            h.txtStatus.setBackgroundResource(R.drawable.bg_status_passed);
            h.txtStatus.setTextColor(ContextCompat.getColor(h.itemView.getContext(), R.color.text_secondary));
        }
    }

    @Override
    public int getItemCount() { return list.size(); }

    static class ViewHolder extends RecyclerView.ViewHolder {
        TextView txtSubjectName, txtSubjectCode, txtCredit, txtTermYear;
        TextView txtMidterm, txtFinal, txtTotal, txtStatus;

        ViewHolder(View v) {
            super(v);
            txtSubjectName = v.findViewById(R.id.txtSubjectName);
            txtSubjectCode = v.findViewById(R.id.txtSubjectCode);
            txtCredit = v.findViewById(R.id.txtCredit);
            txtTermYear = v.findViewById(R.id.txtTermYear);
            txtMidterm = v.findViewById(R.id.txtMidterm);
            txtFinal = v.findViewById(R.id.txtFinal);
            txtTotal = v.findViewById(R.id.txtTotal);
            txtStatus = v.findViewById(R.id.txtStatus);
        }
    }
}