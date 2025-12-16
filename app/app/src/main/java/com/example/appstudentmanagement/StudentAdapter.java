package com.example.appstudentmanagement;

import android.content.Context;
import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import java.util.List;

public class StudentAdapter extends RecyclerView.Adapter<StudentAdapter.StudentViewHolder> {

    private Context context;
    private List<Student> studentList;

    public StudentAdapter(Context context, List<Student> studentList) {
        this.context = context;
        this.studentList = studentList;
    }

    @NonNull
    @Override
    public StudentViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(context)
                .inflate(R.layout.item_student, parent, false);
        return new StudentViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull StudentViewHolder holder, int position) {
        Student student = studentList.get(position);

        holder.txtName.setText(student.getName());
        holder.txtCode.setText("Mã SV: " + student.getStudentCode());

        holder.itemView.setOnClickListener(v -> {
            Intent intent = new Intent(context, StudentDetailActivity.class);
            intent.putExtra("student_code", student.getStudentCode());
            context.startActivity(intent);
        });
    }

    @Override
    public int getItemCount() {
        return studentList.size();
    }

    // ================= VIEW HOLDER =================
    static class StudentViewHolder extends RecyclerView.ViewHolder {

        TextView txtName, txtCode;

        public StudentViewHolder(@NonNull View itemView) {
            super(itemView);
            txtName = itemView.findViewById(R.id.txtName);
            txtCode = itemView.findViewById(R.id.txtCode);
        }
    }
}
