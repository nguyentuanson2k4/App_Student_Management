package com.example.appstudentmanagement.adapter;

import android.content.*;
import android.view.*;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import java.util.ArrayList;
import java.util.List;
import com.example.appstudentmanagement.*;
import com.example.appstudentmanagement.model.Student;

public class StudentAdapter extends RecyclerView.Adapter<StudentAdapter.ViewHolder> {

    private Context context;
    private List<Student> list; // danh sách hiển thị
    private List<Student> fullList; // danh sách gốc để search
    private Class<?> targetActivity;

    public StudentAdapter(Context context, List<Student> list, Class<?> targetActivity) {
        this.context = context;
        this.list = list;
        this.targetActivity = targetActivity;
        this.fullList = new ArrayList<>();
    }

    // UPDATE DATA SAU KHI LOAD API
    public void setData(List<Student> newList) {
        list.clear();
        list.addAll(newList);

        fullList.clear();
        fullList.addAll(newList);

        notifyDataSetChanged();
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View v = LayoutInflater.from(context)
                .inflate(R.layout.item_student, parent, false);
        return new ViewHolder(v);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder h, int position) {
        Student s = list.get(position);
        h.txtName.setText(s.getName());
        h.txtCode.setText("Mã SV: " + s.getStudentCode());

        // CLICK ĐẾN CHI TIẾT
        h.itemView.setOnClickListener(v -> {
            Intent i = new Intent(context, targetActivity);
            i.putExtra("student_code", s.getStudentCode());
            i.putExtra("student_name", s.getName());
            context.startActivity(i);
        });
    }

    @Override
    public int getItemCount() {
        return list.size();
    }
    static class ViewHolder extends RecyclerView.ViewHolder {
        TextView txtName, txtCode;
        ViewHolder(View v) {
            super(v);
            txtName = v.findViewById(R.id.txtName);
            txtCode = v.findViewById(R.id.txtCode);
        }
    }

    // SEARCH SINH VIÊN
    public void filter(String key) {
        key = key.toLowerCase().trim();
        list.clear();

        if (key.isEmpty()) {
            list.addAll(fullList);
        } else {
            for (Student s : fullList) {
                String name = s.getName() == null ? "" : s.getName().toLowerCase();
                String code = s.getStudentCode() == null ? "" : s.getStudentCode().toLowerCase();

                if (name.contains(key) || code.contains(key)) {
                    list.add(s);
                }
            }
        }
        notifyDataSetChanged();
    }
}
